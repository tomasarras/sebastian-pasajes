"use client"

import { formatDateWithSlash } from "@/app/utils/functions"
import Modal from "./modal"
import Input from "../form/input/input"
import FormikStyledRadio from "../form/FormikStyledRadio"
import CommonLabel from "../commonLabel"
import useAuth from "@/app/hooks/useAuth"
import OrderColor from "../orderColor"
import PrimaryButton from "../buttons/primaryButton"
import SecondaryButton from "../buttons/secondaryButton"
import { STATUS_NAME_TO_ID } from "@/app/utils/utils"

export default function ModalChangeOrderStatus({ order, ...props }) {

  const userData = useAuth()

  const canUserAuthorizeOrder = () => userData.isAuthorizer && order.statusId == STATUS_NAME_TO_ID.OPEN
  const canUserOpenOrder = () => (userData.isAuthorizer || userData.isApplicant) && (order.statusId == STATUS_NAME_TO_ID.REJECTED || order.statusId == STATUS_NAME_TO_ID.REJECTED_FROM_OPEN)
  const canUserRejectOrder = () => {
    if (userData.isAuthorizer)
      return order.statusId == STATUS_NAME_TO_ID.OPEN
    if (userData.isAgent || userData.isAdmin)
      return order.statusId == STATUS_NAME_TO_ID.AUTHORIZED
    return false
  }
  const canUserCloseOrder = () => {
    if (userData.isAgent || userData.isAdmin)
      return order.statusId == STATUS_NAME_TO_ID.AUTHORIZED ||
        order.statusId == STATUS_NAME_TO_ID.REJECTED ||
        order.statusId == STATUS_NAME_TO_ID.CANCELLED
    return false
  }
  const canUserCancelOrder = () => {
    if (userData.isAgent || userData.isAdmin)
      return order.statusId == STATUS_NAME_TO_ID.AUTHORIZED ||
        order.statusId == STATUS_NAME_TO_ID.CLOSED ||
        order.statusId == STATUS_NAME_TO_ID.REJECTED
    return false
  }

  return <Modal title={`Cambiar estado`} {...props}>
    {order && userData &&
      <div className="max-w-lg">
        <div className="mt-2">
          <h3 className="flex items-center font-semibold leading-6 text-gray-900"><OrderColor statusId={order.statusId} /><span className="ml-2">Orden N°{order.number}</span></h3>
          <div className="text-sm mt-1 text-gray-500">Creada en {formatDateWithSlash(order.registrationDate)}</div>
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <CommonLabel>Cliente</CommonLabel>
              <Input disabled readOnly value={`${order.client.businessName}`} className={"mb-2"} />
            </div>
            <div>
              <CommonLabel>Pasajero</CommonLabel>
              <Input disabled readOnly value={`${order?.firstName} ${order?.lastName}`} className={"mb-2"} />
            </div>
          </div>
        </div>
        <div className="w-full mt-2 grid grid-cols-1 gap-4">
          <SecondaryButton className={`w-full ${canUserAuthorizeOrder() ? "" : "hidden"}`} actionText={"Autorizar"} />
          <SecondaryButton className={`w-full ${canUserRejectOrder() ? "" : "hidden"}`} actionText={"Rechazar"} />
          <SecondaryButton className={`w-full ${canUserCloseOrder() ? "" : "hidden"}`} actionText={"Cerrar"} />
          <SecondaryButton className={`w-full ${canUserCancelOrder() ? "" : "hidden"}`} actionText={"Anular"} />
          <SecondaryButton className={`w-full ${canUserOpenOrder() ? "" : "hidden"}`} actionText={"Anular"} />
        </div>
      </div>
    }
  </Modal>
}
