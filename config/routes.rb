Rails.application.routes.draw do
  namespace :api do
    namespace :v2 do
      resources :posts, only: %i[index create show destroy] do
        resources :likes, only: %i[index create show] do
          collection do
            delete 'unlike'
            get 'liked'
            get 'post_belongs_to_user'
          end
        end
        resources :replies, only: %i[index create show destroy]
      end
    end
  end

  devise_for :users

  root 'authentication#show_user_content'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
