import * as Dialog from '@radix-ui/react-dialog'
import {
  type ButtonHTMLAttributes,
  type SVGProps,
  useCallback,
  useMemo,
  useState,
} from 'react'
import type { Node } from '../../store/State'
import { useStore } from '../../store/store'
import { ControlButton } from '../ControlButton'
import { FieldsList } from './FieldsList'
import { groupJsonFields } from './groupJsonFields'

export const ValuesDialog = {
  Root: ValuesDialogRoot,
  Trigger: ValuesDialogTrigger,
  Body: ValuesDialogBody,
}

function ValuesDialogRoot({ children }: { children: React.ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>
}

function ValuesDialogTrigger({ disabled }: { disabled: boolean }) {
  return (
    <Dialog.Trigger asChild disabled={disabled}>
      <ControlButton disabled={disabled}>Values</ControlButton>
    </Dialog.Trigger>
  )
}

function ValuesDialogBody({ node }: { node: Node }) {
  const setNodes = useStore((state) => state.setNodes)
  const nodes = useStore((state) => state.nodes)

  const [hiddenFields, setHiddenFields] = useState(node.hiddenFields)
  const groupedFields = useMemo(
    () => groupJsonFields(node.fields),
    [node.fields],
  )

  const modifyNode = useCallback(() => {
    const newNode = {
      ...node,
      hiddenFields,
    }

    setNodes(nodes.map((n) => (n.id === node.id ? newNode : n)))
  }, [node, hiddenFields, setNodes])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-coffee-900/60" />
      <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 overflow-x-none fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] overflow-y-auto border border-coffee-400 bg-coffee-600 p-[25px] shadow-[var(--shadow-6)] focus:outline-none">
        <Dialog.Title className="m-0 font-medium text-lg">
          Values visibility
        </Dialog.Title>
        <Dialog.Description className="mb-5 text-sm leading-normal">
          Make changes to what values are visible in the node.
        </Dialog.Description>

        <div className="mb-4 flex gap-2">
          <DialogButton onClick={() => setHiddenFields([])}>All</DialogButton>
          <DialogButton
            onClick={() => {
              const allFieldNames = Object.values(groupedFields)
                .flat()
                .map((f) => f.name)
              setHiddenFields(allFieldNames)
            }}
          >
            None
          </DialogButton>
          <DialogButton
            className="rounded border border-coffee-400 px-3 py-1 text-sm hover:bg-coffee-500"
            onClick={() => {
              const allFieldNames = Object.values(groupedFields)
                .flat()
                .map((f) => f.name)
              setHiddenFields(
                allFieldNames.filter((f) => !hiddenFields.includes(f)),
              )
            }}
          >
            Invert
          </DialogButton>
        </div>

        <div className="flex flex-col">
          {Object.entries(groupedFields).map(([key, value]) => {
            const isHidden = value.every((field) =>
              hiddenFields.includes(field.name),
            )

            const onChange = () => {
              const fieldNames = value.map((f) => f.name)

              setHiddenFields((prev) =>
                isHidden
                  ? prev.filter((f) => !fieldNames.includes(f))
                  : [...prev, ...fieldNames],
              )
            }

            return (
              <div key={key}>
                <FieldsList
                  fields={value}
                  name={key}
                  onChange={onChange}
                  isHidden={isHidden}
                />
              </div>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Dialog.Close asChild onClick={modifyNode}>
            <DialogButton>Save</DialogButton>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <div
            className="absolute top-2.5 right-2.5 inline-flex cursor-pointer appearance-none items-center justify-center rounded-full focus:outline-none"
            aria-label="Close"
          >
            <XIcon className="stroke-coffee-200" />
          </div>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

function XIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M18 6L6 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DialogButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="border border-coffee-400 px-3 py-1 text-sm hover:bg-coffee-500"
    >
      {children}
    </button>
  )
}
