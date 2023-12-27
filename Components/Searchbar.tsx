'use client'
//If the handleSubmit function involves client-side actions like data validation or navigation without page reloads, marking the component as a Client Component using use client would be appropriate.

const Searchbar = () => {
    const handleSubmit =()=>{}

  return (
    <form 
    className='flex flex-wrap gap-4 mt-12' 
    onSubmit={handleSubmit}
    >
        <input 
        type="text"
        placeholder="Enter product Link"
        className="searchbar-input"
        />
        <button type="submit" className="searchbar-btn">Search</button>
    </form>
  )
}

export default Searchbar