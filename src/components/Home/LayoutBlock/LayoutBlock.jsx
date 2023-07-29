import './LayoutBlock.css'


export default function LayoutBlock({headersTitle, className, id, children}) {
  return (
    <section className={'layout-block'}>
      <h2 className={'layout-block_title'}>{headersTitle}</h2>

      <div className="layout-block_content">
        {children}
      </div>
    </section>
  )
}