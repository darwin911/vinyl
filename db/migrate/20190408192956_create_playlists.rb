class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :name
      t.integer :length
      t.string :playback_url

      t.timestamps
    end
  end
end
