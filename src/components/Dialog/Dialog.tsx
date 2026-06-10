import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import styles from "./Dialog.module.css";
import type {
  ConfirmationDialogProps,
  DestructiveDialogProps,
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOpenChangeHandler,
  DialogOverlayProps,
  DialogProps,
  DialogTitleProps,
} from "./Dialog.types";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const focusableSelector = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type DialogContextValue = {
  open: boolean;
  setOpen: DialogOpenChangeHandler;
  titleId: string;
  descriptionId: string;
  descriptionMounted: boolean;
  setDescriptionMounted: (mounted: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  closeOnEscape: boolean;
  closeOnOverlayClick: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(componentName: string) {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Dialog.`);
  }

  return context;
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
  );
}

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  restoreFocus = true,
  initialFocusRef,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const contentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [descriptionMounted, setDescriptionMounted] = useState(false);
  const reactId = useId();
  const titleId = `atlas-dialog-title-${reactId}`;
  const descriptionId = `atlas-dialog-description-${reactId}`;

  const setOpen = useCallback<DialogOpenChangeHandler>(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      const focusTarget = initialFocusRef?.current ?? getFocusableElements(contentRef.current ?? document.body)[0] ?? contentRef.current;
      focusTarget?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;

      if (restoreFocus) {
        previouslyFocusedElement.current?.focus();
      }
    };
  }, [initialFocusRef, isOpen, restoreFocus]);

  const value = useMemo(
    () => ({
      open: isOpen,
      setOpen,
      titleId,
      descriptionId,
      descriptionMounted,
      setDescriptionMounted,
      contentRef,
      closeOnEscape,
      closeOnOverlayClick,
      initialFocusRef,
    }),
    [closeOnEscape, closeOnOverlayClick, descriptionId, descriptionMounted, initialFocusRef, isOpen, setOpen, titleId],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(({ className, onMouseDown, ...overlayProps }, ref) => {
  const { open, setOpen, closeOnOverlayClick } = useDialogContext("DialogOverlay");

  if (!open) {
    return null;
  }

  return (
    <div
      {...overlayProps}
      ref={ref}
      className={cx(styles.overlay, className)}
      onMouseDown={(event) => {
        onMouseDown?.(event);

        if (!event.defaultPrevented && closeOnOverlayClick && event.target === event.currentTarget) {
          setOpen(false);
        }
      }}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, size = "default", onKeyDown, ...contentProps }, forwardedRef) => {
    const { open, setOpen, titleId, descriptionId, descriptionMounted, contentRef, closeOnEscape } =
      useDialogContext("DialogContent");

    const assignRef = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [contentRef, forwardedRef],
    );

    if (!open) {
      return null;
    }

    return (
      <div className={styles.positioner}>
        <div
          {...contentProps}
          ref={assignRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionMounted ? descriptionId : undefined}
          tabIndex={-1}
          className={cx(styles.content, className)}
          data-size={size}
          onKeyDown={(event) => {
            onKeyDown?.(event);

            if (event.defaultPrevented) {
              return;
            }

            if (event.key === "Escape" && closeOnEscape) {
              event.preventDefault();
              setOpen(false);
              return;
            }

            if (event.key !== "Tab" || !contentRef.current) {
              return;
            }

            const focusableElements = getFocusableElements(contentRef.current);

            if (focusableElements.length === 0) {
              event.preventDefault();
              contentRef.current.focus();
              return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

DialogContent.displayName = "DialogContent";

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, ...headerProps }, ref) => (
  <div {...headerProps} ref={ref} className={cx(styles.header, className)} />
));

DialogHeader.displayName = "DialogHeader";

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, id, ...titleProps }, ref) => {
  const { titleId } = useDialogContext("DialogTitle");

  return <h2 {...titleProps} ref={ref} id={id ?? titleId} className={cx(styles.title, className)} />;
});

DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, id, ...descriptionProps }, ref) => {
    const { descriptionId, setDescriptionMounted } = useDialogContext("DialogDescription");

    useEffect(() => {
      setDescriptionMounted(true);

      return () => {
        setDescriptionMounted(false);
      };
    }, [setDescriptionMounted]);

    return <p {...descriptionProps} ref={ref} id={id ?? descriptionId} className={cx(styles.description, className)} />;
  },
);

DialogDescription.displayName = "DialogDescription";

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(({ className, ...bodyProps }, ref) => (
  <div {...bodyProps} ref={ref} className={cx(styles.body, className)} />
));

DialogBody.displayName = "DialogBody";

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({ className, align = "between", ...footerProps }, ref) => (
  <div {...footerProps} ref={ref} className={cx(styles.footer, className)} data-align={align} />
));

DialogFooter.displayName = "DialogFooter";

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, label = "Close dialog", onClick, ...closeProps }, ref) => {
    const { setOpen } = useDialogContext("DialogClose");

    return (
      <IconButton
        {...closeProps}
        ref={ref}
        icon="x"
        size="32"
        variant="no-border"
        aria-label={label}
        className={cx(styles.closeButton, className)}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
      />
    );
  },
);

DialogClose.displayName = "DialogClose";

export function ConfirmationDialog({
  title,
  description,
  confirmAction,
  cancelAction = { label: "Cancel" },
  ...dialogProps
}: ConfirmationDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogOverlay />
      <DialogContent>
        <div className={styles.closeRow}>
          <DialogClose />
        </div>
        <div className={styles.main}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>{description}</DialogDescription>
          </DialogBody>
          <DialogFooter align="end">
            <Button variant="secondary" size="large" onClick={cancelAction.onClick} disabled={cancelAction.disabled} loading={cancelAction.loading}>
              {cancelAction.label}
            </Button>
            <Button
              variant={confirmAction.variant ?? "primary"}
              size="large"
              onClick={confirmAction.onClick}
              disabled={confirmAction.disabled}
              loading={confirmAction.loading}
            >
              {confirmAction.label}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DestructiveDialog(props: DestructiveDialogProps) {
  const { confirmAction, ...dialogProps } = props;

  return (
    <ConfirmationDialog
      {...dialogProps}
      confirmAction={{
        ...confirmAction,
        variant: "danger",
      }}
    />
  );
}
