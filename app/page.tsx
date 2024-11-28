import './src/pages/Home';
import './src/styles/index.css';
import './src/styles/App.css';
import MainLayout from './src/layout/main-layout';

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
