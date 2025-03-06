interface User {
  id: number
  name: string
}

async function fetchData(time: number): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, time))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

interface TestComponentProps {
  time: number
}

const TestComponent = async ({ time }: TestComponentProps): Promise<JSX.Element> => {
  const data: User[] = await fetchData(time)

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>B: {item.name}</p>
      ))}
    </div>
  )
}

export default TestComponent
