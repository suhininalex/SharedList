package com.sharedlist.api

interface ItemsManager {
    fun create(name: String): ItemList
    fun rename(id: String, name: String)
    fun find(id: String): ItemList?
    fun addItem(id: String, item: String)
}

data class Item(val name: String)

data class ItemList (val id: String, val name: String, val items: List<Item>)