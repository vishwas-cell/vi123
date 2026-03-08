const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vishwas N Bhagavanatnavar. All Rights Reserved.
        </p>
        <a href="#" className="font-display text-sm font-bold text-foreground hover:text-primary transition-colors">
          V<span className="text-primary">/</span>B
        </a>
      </div>
    </footer>
  );
};

export default Footer;
