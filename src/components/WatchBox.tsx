import { exhaustiveGuard } from '@/lib/common/utils/exhaustive-guard';
import {
  ProfileWatchBoxViewModelType,
  selectProfileWatchBoxViewModel
} from '@/pages/Profile/ProfileWatchBox/profile-watch-box.view-model';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from './ArticleList';

const getNow = () => new Date().toISOString();

export const WatchBox = ({ userId }: { userId: string }) => {
  const viewModel = useSelector(selectProfileWatchBoxViewModel({ userId, getNow }));

  const watchBoxNode: ReactNode = (() => {
    switch (viewModel.type) {
      case ProfileWatchBoxViewModelType.NO_WATCH_BOX:
        return null;
      case ProfileWatchBoxViewModelType.WATCH_BOX_LOADING:
        return <span>{viewModel.info}</span>;
      case ProfileWatchBoxViewModelType.EMPTY_WATCH_BOX:
        return <span>{viewModel.info}</span>;
      case ProfileWatchBoxViewModelType.WATCH_BOX_WITH_ARTICLES:
        return <ArticleList articles={viewModel.articles} />;
      default:
        return exhaustiveGuard(viewModel);
    }
  })();
  return <>{watchBoxNode}</>;
};
