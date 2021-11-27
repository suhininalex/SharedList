package com.sharedlist

import com.sharedlist.api.ItemsManager
import com.sharedlist.impl.ItemsManagerInMemoryImpl
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.http.NotFoundResponse
import io.javalin.http.staticfiles.Location

data class Name(val name: String)

fun main() {
    val itemsManager: ItemsManager = ItemsManagerInMemoryImpl()
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
                    context.status(200)
                } else {
                    throw NotFoundResponse()
                }
            }

            delete("{id}") { context ->
                val id = context.pathParam("id")
                itemsManager.removeList(id)
                context.status(204)
            }

            put("") { context ->
                val value = context.bodyAsClass(Name::class.java)
                val itemList = itemsManager.createList(value.name)
                context.json(itemList)
                context.status(201)
            }

            put("{id}/items") { context ->
                val id = context.pathParam("id")
                val request = context.bodyAsClass(Name::class.java)
                val item = itemsManager.addItem(id, request.name)
                context.json(item)
                context.status(201)
            }

            delete("{listId}/items/{itemId}") { context ->
                val listId = context.pathParam("listId")
                val itemId = context.pathParam("itemId")
                itemsManager.removeItem(listId, itemId)
                context.status(204)
            }
        }
    }
    .start(80)
}



