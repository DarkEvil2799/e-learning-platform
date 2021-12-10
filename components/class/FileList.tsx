import Link from 'next/link'

type Props = {
  files: any[]
}

export default function FileList({
  files
}: Props) {
  return (
    <div className="w-full md:max-w-sm">
    <div className="mt-2 py-4 border-b border-primary-400">
      <h3 className="text-xl leading-6 font-medium text-primary-100">Files</h3>
      <p className="mt-1 text-sm text-primary-400">
        These are the files from the courses that you&apos;re in.
      </p>
    </div>
    <div>
      <div className="flow-root mt-4">
        <ul className="-my-5 divide-y divide-primary-400">
          {files.length > 0 ? (
            files.sort((a:any, b:any) => (new Date(b.time).getTime() - new Date(a.time).getTime())).map((file, index) => (
              
              <li key={index} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-100 truncate">{file.name}</p>
                    <p className="text-sm text-primary-400 truncate">{file.course}</p>
                  </div>
                  <div>
                    <Link href={file.url ?? "#"}>
                      <a
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-primary-400 text-sm leading-5 font-medium rounded-full text-primary-100 bg-primary-500 hover:bg-primary-400"
                      >
                        Download
                      </a>
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="mt-4 text-primary-400">No files available for now.</p>
          )}
        </ul>
      </div>
    </div>
    </div>
  )
}