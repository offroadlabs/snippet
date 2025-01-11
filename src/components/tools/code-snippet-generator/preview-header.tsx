export function PreviewHeader() {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/50 bg-[hsl(var(--code-background))] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-warning/80 shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-success/80 shadow-sm" />
      </div>
    </div>
  );
}
