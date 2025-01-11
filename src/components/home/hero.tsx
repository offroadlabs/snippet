export function AnimatedHero() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4 animate-fade-in">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgba(158,195,58,1)] via-[rgba(36,135,199,1)] to-[rgba(158,195,58,1)] animate-gradient-x">
        Code Snippet Generator
      </h1>
      <p className="text-lg animate-fade-in-delayed">
        <span className="text-primary">Create beautiful code snippets</span>{" "}
        <span className="text-secondary">for your social media in seconds</span>
      </p>
    </div>
  );
}
