export function WalletResume() {
  return (
    <div className="flex flex-row border-[1px] lg:border-none border-accent-foreground items-center justify-between p-2 px-4 bg-white w-full lg:max-w-96 shadow-sm lg:shadow-none">
      <div className="flex flex-col h-full max-w-2xl text-xl gap-2 justify-between items-center bg-white">
        <span>Carteira do Fernando</span>
        <span className="text-sm font-bold">Adicionar</span>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col w-full justify-end items-end h-full">
          <span className="text-xs">Assets:</span>
          <span className="text-sm font-bold">$ 99.999.999,99</span>
        </div>
        <div className="flex flex-col w-full justify-end items-end h-full">
          <span className="text-xs">Dividends:</span>
          <span className="text-sm font-bold">$ 99.999.999,99</span>
        </div>
      </div>
    </div>
  );
}
