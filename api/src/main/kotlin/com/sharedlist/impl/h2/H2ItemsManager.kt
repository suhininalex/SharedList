package com.sharedlist.impl.h2

import com.sharedlist.api.Item
import com.sharedlist.api.ItemList
import com.sharedlist.api.ItemsManager
import com.sharedlist.impl.UIDGenerator
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

object H2ItemsManager : ItemsManager {

    init {
        Database.connect("jdbc:h2:file:./db/lists", driver = "org.h2.Driver", user = "root", password = "")
        transaction {
            SchemaUtils.create(ListTable, ItemTable)
        }
    }

    override fun createList(name: String): ItemList {
        return transaction {
            val id = UIDGenerator.getID()
            ListTable.insert {
                it[ListTable.id] = id
                it[ListTable.name] = name
            }
            ItemList(id, name, emptyList())
        }
    }

    override fun findList(listId: String): ItemList? {
        return transaction {
            val itemList = ListTable.select {
                ListTable.id eq listId
            }
            val listName = itemList.singleOrNull()?.get(ListTable.name) ?: return@transaction null
            val items = ItemTable
                .select(ItemTable.listId eq listId)
                .map { Item(it[ItemTable.id], it[ItemTable.name]) }
            ItemList(listId, listName, items)
        }
    }

    override fun removeList(listId: String) {
        transaction {
            ListTable.deleteWhere {
                ListTable.id eq listId
            }
        }
    }

    override fun addItem(listId: String, name: String): Item {
        return transaction {
            val result = ItemTable.insert {
                it[ItemTable.id] = UIDGenerator.getID()
                it[ItemTable.name] = name
                it[ItemTable.listId] = listId
            }
            val id = result[ItemTable.id]
            Item(id, name)
        }
    }

    override fun removeItem(listId: String, itemId: String) {
        transaction {
            ItemTable.deleteWhere {
                (ItemTable.listId eq listId) and (ItemTable.id eq itemId)
            }
        }
    }
}

object ListTable : Table() {
    val id = varchar("id", 36)
    val name = varchar("name", 100)

    override val primaryKey = PrimaryKey(id, name = "PK_LIST_ID")
}

object ItemTable : Table() {
    val id = varchar("id", 36)
    val listId = reference("listId", ListTable.id)
    val name = varchar("name", 100)

    override val primaryKey = PrimaryKey(id, name = "PK_ITEM_ID")
}