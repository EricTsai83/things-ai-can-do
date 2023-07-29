interface Props {
  title: string;
  content: string;
  children: React.ReactNode;
}

function PageTitle({ title, content, children }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="flex items-center justify-center pb-2 pl-2 pt-2 text-4xl font-semibold text-teal-700">
          {title}
        </h1>
        {children}
      </div>

      <div className="pb-16 pl-2 pt-4 text-base font-semibold text-zinc-600 ssm:text-lg">
        {content}
        <p className="text-right text-sm text-zinc-400">{`[由 ChatGPT 產生]`}</p>
      </div>
    </div>
  );
}

export default PageTitle;
