"use client"
import FilterButton from "./buttons/filterButton"
import SecondaryButton from "./buttons/secondaryButton"

export default function MainHeader({ headerButton, onOpenFilterModal, withFilter = false, onClickActionText, hiddenActionText = false, ...props}) {

  return (
    <>
        <div className="rounded-t bg-white p-3 md:p-4 flex justify-between items-center">
            <h3 className="font-medium">{props.mainTitle}</h3>
            <div className="flex">{props.children}</div>
            <div className="flex">
              {headerButton}
              {onOpenFilterModal && <FilterButton onClick={onOpenFilterModal} className="mr-4" />}
              {!hiddenActionText && <SecondaryButton size="sm" actionText={props.actionText} onClick={onClickActionText} />}
            </div>
        </div>
    </>
  )
}
