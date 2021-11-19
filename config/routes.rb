Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
    end
  end
  root 'posts#index'
  get '/*path' => 'posts#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
