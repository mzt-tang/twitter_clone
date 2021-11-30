class Post < ApplicationRecord
    validates :tweet, presence: true, length: { maximum: 500}

    belongs_to :user
    has_many :likes, dependent: :destroy
    has_many :users_who_liked, through: :likes, source: :user 

    def as_json(*args)
        super.merge(likes: likes_count)
    end
end
