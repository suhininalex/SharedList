package com.sharedlist.impl

import com.sharedlist.api.Item
import com.sharedlist.api.ItemList
import com.sharedlist.api.ItemsManager

class ItemsManagerInMemoryImpl: ItemsManager {
    private val listMap = HashMap<String, ItemList>()

    override fun createList(name: String): ItemList {
        val itemList = ItemList(UIDGenerator.getID(), name, emptyList())
        listMap[itemList.id] = itemList
        return itemList
    }

    override fun findList(listId: String): ItemList? {
        return listMap[listId]
    }

    override fun removeList(listId: String) {
        listMap.remove(listId)
    }

    override fun addItem(listId: String, name: String): Item {
        val itemList = listMap[listId] ?: throw NoSuchElementException("List not found (${listId})")
        val item = Item(UIDGenerator.getID(), name)
        listMap[listId] = itemList.copy(items = itemList.items + item)
        return item
    }

    override fun removeItem(listId: String, itemId: String) {
        val itemList = listMap[listId] ?: throw NoSuchElementException("List not found (${listId})")
        listMap[listId] = itemList.copy(items = itemList.items.filter { it.id != itemId })
    }
}