import Link from 'next/link'

export const ClassCard = ({
  theClass
}:any) => {
  return (
    <div className="group px-6 py-5 rounded-lg ring-blue-500 bg-primary-500 hover:ring-4 active:bg-primary-400">
      <Link href={`class/${theClass.id}`}>
      <a>
        <div className="flex flex-col space-y-2">
          <div className="font-bold text-xl text-primary-100">{theClass.title}</div>
          <p className="font-medium text-primary-300 leading-snug">{theClass.description}</p>
          <div className="flex flex-row space-x-2 items-center pt-2">
            { theClass.students?.length > 0 ? (
                <>
                <div className="flex flex-row -space-x-2">
                  { theClass.students.slice(0, 3).map((student: any) => (
                    <img 
                      key={student.id}
                      src={student.image} 
                      className="relative inline-block w-10 h-10 rounded-full ring-4 ring-primary-500" />
                  ))}
                </div>
                { theClass.students.length > 3 && (
                  <span className="font-medium text-primary-300 leading-snug">+ {theClass.students.length - 3} more</span>
                ) }
                </>
              ) : (
                <span className="font-medium italic text-primary-300 leading-snug">This class is empty.</span>
            ) }
          </div>
        </div>
      </a>
      </Link>
    </div>    
  )
}