import { useTypeWriter } from '../hooks/useTypeWriter';

interface TypeWriterProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  waitTime?: number;
}

export default function TypeWriter({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  waitTime = 2000,
}: TypeWriterProps) {
  const displayText = useTypeWriter({ texts, typeSpeed, deleteSpeed, waitTime });

  return (
    <div className="hero-title">
      <span className="typed-prefix">&gt;&gt; </span>
      <span className="typed-text">{displayText}</span>
      <span className="cursor">|</span>
    </div>
  );
}
