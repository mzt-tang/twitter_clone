class Post < ApplicationRecord
    validates :tweet, presence: true, length: { maximum: 500}
    belongs_to :user
end
