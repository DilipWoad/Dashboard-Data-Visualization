import MetrixCard from "./reuseableComponents/MetrixCard"

const HeaderMetrix = () => {
  return (
    <div className='bg-yellow-300 p-2 flex justify-between gap-2 overflow-auto '>
        <MetrixCard/>
        <MetrixCard/>
        <MetrixCard/>
        <MetrixCard/>
    </div>
  )
}

export default HeaderMetrix