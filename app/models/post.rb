class Post < ApplicationRecord
    validates :tweet, presence: true, length: { maximum: 500}

    belongs_to :user
    has_many :likes, dependent: :destroy
    has_many :users_who_liked, through: :likes, source: :user

    def likes_id
        Like.where(user_id: current_user.id, post_id: params[:post_id])
    end

    def as_json(*args)
        super.merge(likes: likes_count)
    end
end
