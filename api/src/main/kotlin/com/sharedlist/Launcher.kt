package com.sharedlist

import com.sharedlist.api.ItemsManager
import com.sharedlist.impl.ItemsManagerInMemoryImpl
import com.sharedlist.impl.h2.H2ItemsManager
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.http.HttpCode
import io.javalin.http.staticfiles.Location
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

data class Name(val name: String)

fun main() {
    val itemsManager: ItemsManager = H2ItemsManager
    Javalin.create { config ->
        config.enableCorsForAllOrigins()
        config.addStaticFiles("html/", Location.CLASSPATH)
    }
    .routes {
        path("/api/lists/") {
            get("{id}") { context ->
                val id = context.pathParam("id")
                val itemList = itemsManager.findList(id)
                if (itemList != null) {
                    context.json(itemList)
                    context.status(HttpCode.OK)
                } else {
                    context.status(HttpCode.NOT_FOUND)
                }
            }

            delete("{id}") { context ->
                val id = context.pathParam("id")
                itemsManager.removeList(id)
                context.status(HttpCode.OK)
            }

            put("") { context ->
                val value = context.bodyAsClass(Name::class.java)
                val itemList = itemsManager.createList(value.name)
                context.json(itemList)
                context.status(HttpCode.CREATED)
            }

            put("{id}/items") { context ->
                val id = context.pathParam("id")
                val request = context.bodyAsClass(Name::class.java)
                val item = itemsManager.addItem(id, request.name)
                context.json(item)
                context.status(HttpCode.CREATED)
            }

            delete("{listId}/items/{itemId}") { context ->
                val listId = context.pathParam("listId")
                val itemId = context.pathParam("itemId")
                itemsManager.removeItem(listId, itemId)
                context.status(HttpCode.OK)
            }
        }
    }
    .start(8080)
}



