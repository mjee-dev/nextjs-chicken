import MainLayout from "../[locale]/(main)/layout";
import "../styles/globals.css";
import { createTranslation } from "../utils/localilzation/server";
import { LocaleTypes } from "../utils/localilzation/setting";


export default async function Home ({params}: {
  params: { locale: LocaleTypes}
})  {
  const { locale } = params;
  const {t} = await createTranslation(locale, 'common');    // 'common': json 파일명
  return (
    <div>
      <MainLayout>
          <div>
              <div className="text-3xl font-bold underline">
                {t('text.home')};
              </div>
          </div>
      </MainLayout>
    </div>
  );
}
