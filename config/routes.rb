Rails.application.routes.draw do

  devise_for :users
  
  root to: 'application#angular'
  
  namespace :a1 do
    get 'dashboard' => 'dashboard#show'
    resources :customers
  end
  

  resources :posts, only: [:create, :index, :show] do
      resources :comments, only: [:show, :create] do
        member do
          put '/upvote' => 'comments#upvote'
        end
      end

      member do
        put '/upvote' => 'posts#upvote'
      end
  end
    
end
