

export default function User({ username, profilePic }) {
  return (
    <div className="flex flex-col justify-start items-start gap-5 relative">
        <div className="rounded-full border-2 border-primary p-1">
                <img 
                src={profilePic} 
                alt={username} 
                className="object-cover size-5 w-full"
                />
        </div>
        <h4 className="font-semibold text-lg text-secondary">{username}</h4>
    </div>
  )
}
