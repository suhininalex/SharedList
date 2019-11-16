package com.sharedlist.impl

import com.sharedlist.api.Item
import com.sharedlist.api.ItemList
import com.sharedlist.api.ItemsManager

class ItemsManagerDummy: ItemsManager {
    private val listMap = HashMap<String, ItemList>()

    init {
        val test = ItemList(id = "test", name = "Test list", items = listOf(Item("Сало"), Item("Сахар")))
        listMap[test.id] = test
    }

    override fun create(name: String): ItemList {
        val itemList = ItemList(UIDGenerator.getID(), name, emptyList())
        listMap[itemList.id] = itemList
        return itemList
    }

    override fun rename(listId: String, name: String) {
        val itemList = listMap[listId] ?: return
        listMap[listId] = itemList.copy(name = name)
    }

    override fun find(listId: String): ItemList? {
        return listMap[listId]
    }

    override fun remove(listId: String) {
        listMap.remove(listId)
    }

    override fun addItem(listId: String, item: Item) {
        val itemList = listMap[listId] ?: return
        listMap[listId] = itemList.copy(items = itemList.items + listOf(item))
    }

    override fun removeItem(listId: String, itemId: String) {
        val itemList = listMap[listId] ?: return
        listMap[listId] = itemList.copy(items = itemList.items.filterNot { it.name == itemId })
    }
}