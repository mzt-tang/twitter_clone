class AddDetailsToReplies < ActiveRecord::Migration[6.0]
  def change
    change_table :replies do |t|
      t.text :comment

      t.timestamps
    end
  end
end
