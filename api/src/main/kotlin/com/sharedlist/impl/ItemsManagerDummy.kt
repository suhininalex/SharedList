package com.sharedlist.impl

import com.sharedlist.api.Item
import com.sharedlist.api.ItemList
import com.sharedlist.api.ItemsManager

class ItemsManagerDummy: ItemsManager {
    override fun create(name: String): ItemList {
        return ItemList(UIDGenerator.getID(), name, emptyList())
    }

    override fun rename(listId: String, name: String) {

    }

    override fun find(listId: String): ItemList {
        return ItemList(listId, "List name", listOf(Item("Orange"), Item("Lemon")))
    }

    override fun remove(listId: String) {

    }

    override fun addItem(listId: String, item: Item) {

    }

    override fun removeItem(listId: String, itemId: String) {

    }
}