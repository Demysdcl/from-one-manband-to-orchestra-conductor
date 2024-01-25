import { ComplexButton } from './shared/components'

export const Componentization = () => {
  return (
    <div>
      <h1 className="text-3xl mb-6">Componentization</h1>

      <h2 className="text-xl mb-4">Buttons examples</h2>
      <div className="flex gap-6">
        <ComplexButton>Filled</ComplexButton>

        <ComplexButton variant="outline">Outline</ComplexButton>

        <ComplexButton variant="text">Text</ComplexButton>
        <ComplexButton variant="link">Link</ComplexButton>
      </div>
    </div>
  )
}
