
type Props = {
  avatar?: string|null
  name?: string|null
  role?: string|null
}

export default function UserInformationCard({
  avatar,
  name,
  role
}: Props) {
  return (
    <div className="rounded-lg bg-primary-500 p-6 overflow-hidden mb-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full" src={avatar ?? ""} alt="" />
            </div>
            <div className="mt-4 text-center text-primary-400 sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium">Welcome back,</p>
              <p className="text-xl font-bold text-primary-100 sm:text-2xl">{name}</p>
              <p className="text-base font-medium capitalize">{role ?? "student"}</p>
            </div>
          </div>
        </div>
      </div>
  )
}