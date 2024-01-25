import { Toast, useToasts } from '.'

export const ToastContainer = () => {
  const toasts = useToasts((state) => state.toasts)

  return (
    <div className="fixed z-50 bottom-8 right-8 flex flex-col-reverse gap-4">
      {toasts.map((toast) => (
        <Toast key={toast.uuid} {...toast} />
      ))}
    </div>
  )
}
