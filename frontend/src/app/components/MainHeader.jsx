"use client"
import SecondaryButton from "./buttons/secondaryButton"

export default function MainHeader({onClickActionText, hiddenActionText = false, ...props}) {

  return (
    <>
        <div className="rounded-t bg-white p-3 md:p-4 flex justify-between items-center">
            <h3 className="font-medium">{props.mainTitle}</h3>
            <div className="flex">{props.children}</div>
            {!hiddenActionText && <SecondaryButton actionText={props.actionText} onClick={onClickActionText} />}
        </div>
    </>
  )
}
