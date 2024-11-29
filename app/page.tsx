
// import './src/styles/index.css';
// import './src/styles/App.css';

import MainLayout from "./(dashboard)/layout";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <MainLayout>
          <div>
              <div className="text-3xl font-bold underline">
                  Hello, Tailwind! 홈!
              </div>
          </div>
      </MainLayout>
    </div>
  );
}
