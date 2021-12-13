class CreateReplies < ActiveRecord::Migration[6.0]
  def change
    create_table :replies do |t|
      t.text :comment

      t.references :user, null: false, foreign_key: false
      t.references :post, null: false, foreign_key: false

      t.timestamps
    end
  end
end
