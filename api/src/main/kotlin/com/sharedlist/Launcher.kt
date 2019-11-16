package com.sharedlist

import com.sharedlist.api.Item
import com.sharedlist.api.ItemsManager
import com.sharedlist.impl.ItemsManagerDummy
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.http.NotFoundResponse

data class Name(val name: String)

fun main() {
    val itemsManager: ItemsManager = ItemsManagerDummy()
    Javalin.create{ config ->
        config.enableCorsForAllOrigins()
    }
    .routes {
        path("/api/lists/") {
            get(":id") { context ->
                val id = context.pathParam("id")
                val itemList = itemsManager.find(id)
                if (itemList != null) {
                    context.json(itemList)
                    context.status(200)
                } else {
                    throw NotFoundResponse()
                }
            }

            delete(":id") { context ->
                val id = context.pathParam("id")
                itemsManager.remove(id)
                context.status(200)
            }

            put("") { context ->
                val value = context.bodyAsClass(Name::class.java)
                val itemList = itemsManager.create(value.name)
                context.json(itemList)
                context.status(201)
            }

            patch(":id") { context ->
                val id = context.pathParam("id")
                val value = context.bodyAsClass(Name::class.java)
                itemsManager.rename(id, value.name)
                context.status(200)
            }

            put(":id/items") { context ->
                val id = context.pathParam("id")
                val item = context.bodyAsClass(Item::class.java)
                itemsManager.addItem(id, item)
                context.status(201)
            }

            delete(":listId/items/:itemId") { context ->
                val listId = context.pathParam("listId")
                val itemId = context.pathParam("itemId")
                itemsManager.removeItem(listId, itemId)
                context.status(200)
            }
        }
    }
    .start(8080)
}



