import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { getCategories } from '../api/services/categories.service'
import { ICategory } from '../utils/interfaces'

const App = () => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const sessionStorageCartCount = sessionStorage.getItem('cartCount')

    if (sessionStorageCartCount) return parseInt(sessionStorageCartCount, 10)
    return 0
  })
  const [categories, setCategories] = useState<ICategory[]>([])

  const fetchData = async () => {
    try {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const navBarItems = () =>
    categories.map((item, index, array) => {
      const includeRedText = index === array.length - 1

      return (
        <li
          key={item.id}
          className={`px-4 py-1 w-50 cursor-pointer ${
            includeRedText ? 'text-red-600' : ''
          }`}
        >
          {item.name}
        </li>
      )
    })

  const handleAddToCart = () => {
    const newCartCount = cartCount + 1

    setCartCount(newCartCount)
    sessionStorage.setItem('cartCount', newCartCount.toString())
  }

  const hasCartMoreThanTenItems = cartCount >= 10

  return (
    <div>
      <nav className='flex px-7 mx-14 font-semibold uppercase leading-5 tracking-wider'>
        <div className='basis-full flex items-center h-20'>
          <div className='basis-32 shrink-0 mr-6 cursor-pointer'>
            <img src='images/logo.png' alt='Logo' />
          </div>
          <ul className='flex space-x-2 mr-20 min-w-max'>{navBarItems()}</ul>
          <div className='flex basis-full justify-end items-center'>
            <div className='flex items-center'>
              <form className='mr-6' onSubmit={e => e.preventDefault()}>
                <SearchIcon
                  fontSize='small'
                  className='absolute top-[1.90rem] ml-2.5'
                />
                <input
                  placeholder='Search'
                  className='border-solid border-[#363336] border-[1px] h-10 px-5 rounded-md text-[1rem] indent-3 font-medium placeholder:font-semibold w-56'
                  type='search'
                  name=''
                  id=''
                />
              </form>
              <div
                onClick={() => handleAddToCart()}
                className='flex items-center pr-7 hover:cursor-pointer'
              >
                <ShoppingCartOutlinedIcon
                  fontSize={'large'}
                  className='text-sm'
                />
                <span
                  className={`text-xs rounded-md ${
                    hasCartMoreThanTenItems ? 'w-6' : 'w-4'
                  } bg-slate-300/50 text-center -ml-[0.30rem] mt-1`}
                >
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App
