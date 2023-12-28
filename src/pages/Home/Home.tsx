import '@/App.css';
import { ArticleList } from '@/components/ArticleList';
import { exhaustiveGuard } from '@/lib/common/utils/exhaustive-guard';
import { RootState } from '@/lib/create-store';
import { HomeViewModelType, selectHomeViewModel } from '@/pages/Home/home.view-model';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

const selector = (rootState: RootState) => selectHomeViewModel(rootState, () => new Date().toISOString());

export const Home = () => {
  const viewModel = useSelector<RootState, ReturnType<typeof selectHomeViewModel>>(selector);

  const watchBoxNode: ReactNode = (() => {
    switch (viewModel.type) {
      case HomeViewModelType.NO_WATCH_BOX:
        return null;
      case HomeViewModelType.WATCH_BOX_LOADING:
        return <span>{viewModel.info}</span>;
      case HomeViewModelType.EMPTY_WATCH_BOX:
        return <span>{viewModel.info}</span>;
      case HomeViewModelType.WATCH_BOX_WITH_ARTICLES:
        return <ArticleList articles={viewModel.articles} />;
      default:
        return exhaustiveGuard(viewModel);
    }
  })();

  return <>{watchBoxNode}</>;
};
