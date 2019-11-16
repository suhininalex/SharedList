package com.sharedlist.api

interface ItemsManager {
    fun create(name: String): ItemList
    fun rename(listId: String, name: String)
    fun find(listId: String): ItemList?
    fun remove(listId: String)
    fun addItem(listId: String, item: Item)
    fun removeItem(listId: String, itemId: String)
}

data class Item(val name: String) {
    init {
        require(name.isNotBlank())
    }
}

data class ItemList (val id: String, val name: String, val items: List<Item>)