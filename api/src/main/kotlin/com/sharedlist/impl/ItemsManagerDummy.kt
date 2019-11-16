package com.sharedlist.impl

import com.sharedlist.api.Item
import com.sharedlist.api.ItemList
import com.sharedlist.api.ItemsManager

class ItemsManagerDummy: ItemsManager {
    override fun create(name: String): ItemList {
        return ItemList(UIDGenerator.getID(), name, emptyList())
    }

    override fun rename(id: String, name: String) {

    }

    override fun find(id: String): ItemList {
        return ItemList(id, "List name", listOf(Item("Orange"), Item("Lemon")))
    }

    override fun addItem(id: String, item: String) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}