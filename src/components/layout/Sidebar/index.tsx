const Sidebar = () => {
  return (
    <aside className="z-40 h-svh space-y-4 border-r bg-white p-4 max-md:absolute">
      <header>
        <div className="flex aspect-square min-w-12 items-center justify-center rounded-md border border-accent bg-zinc-200 shadow-sm">
          G
        </div>
      </header>

      <menu className="flex flex-col items-center justify-start gap-6">
        {[1, 2, 3].map((item) => (
          <li
            key={item}
            className="flex aspect-square min-w-8 items-center justify-center rounded-md bg-zinc-100"
          ></li>
        ))}
      </menu>
    </aside>
  );
};

export default Sidebar;
