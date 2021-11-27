package com.sharedlist.api

interface ItemsManager {
    fun createList(name: String): ItemList
    fun findList(listId: String): ItemList?
    fun removeList(listId: String)
    fun addItem(listId: String, name: String): Item
    fun removeItem(listId: String, itemId: String)
}

data class ItemList (val id: String, val name: String, val items: List<Item>)
data class Item(val id: String, val name: String)
