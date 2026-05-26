interface StoreFrontProps {
  params: Promise<{ slug: string }>;
}

export default async function StoreFront({ params }: StoreFrontProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="border border-zinc-200 bg-white p-10 rounded-3xl max-w-md shadow-sm">
        <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
          ClearRack Live Instance
        </span>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase mt-2">
          {slug} Showcase
        </h1>
        <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
          This customized workspace container is resolving live on subdomains
          natively via ClearRack middleware rewrites.
        </p>
      </div>
    </div>
  );
}
