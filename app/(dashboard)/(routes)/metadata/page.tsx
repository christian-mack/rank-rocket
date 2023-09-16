import { UserButton } from "@clerk/nextjs"

const MetadataPage = () => {
  return (
    <div className="">
      <h1>Metadata Page (Protected)</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default MetadataPage