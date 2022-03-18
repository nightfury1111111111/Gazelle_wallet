/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

import { AbstractBalanceItem } from '@/lib/types'

type propType = {
  balanceItems: AbstractBalanceItem[]
  setSelectedToken: React.Dispatch<
    React.SetStateAction<AbstractBalanceItem | undefined>
  >
  selectedToken: AbstractBalanceItem
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SendTokenDropdownMenu({
  balanceItems,
  setSelectedToken,
  selectedToken,
}: propType) {
  const thumbnail_replacement = chrome.runtime.getURL('images/uk_heart.png')

  const balanceItemsWithId = balanceItems.map((element, index) => {
    const thumbnail = element.thumbnail
      ? element.thumbnail
      : thumbnail_replacement

    return { ...element, thumbnail: thumbnail, id: index }
  })

  return (
    <Listbox value={selectedToken} onChange={setSelectedToken}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selectedToken.symbol}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {balanceItemsWithId.map((balanceItem) => (
                  <Listbox.Option
                    key={balanceItem.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={balanceItem}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {balanceItem.symbol}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
