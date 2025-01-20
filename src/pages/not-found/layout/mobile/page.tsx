import Link from 'next/link'

export default async function NotFoundPage() {

  return <div>
      <h1>Страница не найдена</h1>
      <div>
        <Link href="/">Вернуться на главную страницу</Link>
      </div>
  </div>
}