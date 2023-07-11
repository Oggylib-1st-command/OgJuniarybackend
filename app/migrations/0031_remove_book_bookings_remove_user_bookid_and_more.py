# Generated by Django 4.2 on 2023-07-11 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0030_remove_user_bookid_remove_user_bookid_favorites_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='bookings',
        ),
        migrations.RemoveField(
            model_name='user',
            name='bookid',
        ),
        migrations.RemoveField(
            model_name='user',
            name='bookid_favorites',
        ),
        migrations.RemoveField(
            model_name='user',
            name='bookid_history',
        ),
        migrations.AddField(
            model_name='book',
            name='bookings',
            field=models.TextField(blank=True, max_length=30, null=True, verbose_name='Бронь книги'),
        ),
        migrations.AddField(
            model_name='user',
            name='bookid',
            field=models.ManyToManyField(blank=True, default=None, max_length=30, related_name='bookid', to='app.booking', verbose_name='id взятой книги'),
        ),
        migrations.AddField(
            model_name='user',
            name='bookid_favorites',
            field=models.ManyToManyField(blank=True, default=None, max_length=700, related_name='bookid_favorites', to='app.booking', verbose_name='id избранной книги'),
        ),
        migrations.AddField(
            model_name='user',
            name='bookid_history',
            field=models.ManyToManyField(blank=True, default=None, max_length=1000, related_name='bookid_history', to='app.booking', verbose_name='id бронированных книг в истории'),
        ),
    ]
